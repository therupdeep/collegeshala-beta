function uploadNotes(file,authToken,chaptername,subjectname,universityname,sem) {
    // notes = document.getElementById('notes');
    // var file = notes.files[0];
    let noteId = uuidv4(); // Replace this function immediately
    let fs = new FileReader();
    fs.abort()
    fs.onload = function(file){
        console.log(file)
        var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: 'collegeshala-notes' }
        })
        s3.config.region = "ap-south-1";
        console.log(s3)
        var params = {
            Bucket: 'collegeshala-notes',
            Key: noteId + '.pdf',
            Body: file.target.result,
            ACL: "public-read"
        }
        s3.upload(params, function(err,data){
            if(err) {
                console.log(err,err.stack);
                alert(err)
            }
            else {
                console.log(data);
                const noteurl = data.Location;
                $.ajax({
                    method: 'POST',
                    url: "https://api.collegeshala.com/addnewnote",
                    headers: {
                        authorization: authToken
                    },
                    data: JSON.stringify({
                        noteId,
                        noteurl,
                        chaptername,
                        subjectname,
                        universityname,
                        sem,
                    }),
                    contentType: 'application/json',
                    success: function complete(result) {
                        console.log(result);
                        alert("Note Upload Successful");
                        window.location.href="/my-uploads.html"
                    },
                    error: function error(err) {
                        console.error(err);
                        alert('Error! Please try again');
                    }
                });
            }
        })
    };
    fs.readAsArrayBuffer(file);
}
// Note: Replace the following function with uuid-node module immediately after using node
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
