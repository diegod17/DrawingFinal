var members = document.getElementById("members");

function loadImage(obj) {
  var img = document.createElement("img");
  const figure = document.createElement("figure");
  const delButton = document.createElement("button");
  var pleft = document.createElement("bruh");
  delButton.innerText = "delete";
  delButton.name = obj.fileName;
  delButton.setAttribute( "onClick", "javascript: deleteImg(this.name);" );


  const figcaption = document.createElement("figcaption");
  figcaption.innerText = "By: " + obj.user;

  pleft.innerText = "likes = " + obj.likes;
  pleft.id = obj.fileName + "likes";
  img.src = obj.fileName;  // Give it address
  img.style.height = '216px';
  img.style.width = '216px';

  figure.id = obj.fileName;

  figure.appendChild(img);
  figure.appendChild(figcaption);
  figure.appendChild(delButton);
  figure.appendChild(pleft);
  members.appendChild(figure);

}
function updateLikes(e) {
        let likeCounter = document.getElementById(e.fileName + "likes")
        likeCounter.innerText = "likes = " + Number(e.likes)
}

        let socket = io();
        let dataBase;

        socket.on('dataBase', function (data) {
        dataBase=data;
        dataBase.forEach(element => loadImage(element));
        });

        socket.on('newImg', function (data) {
        console.log('made');
        loadImage(data);
        });
        //socket.emit('like',"img0.png",1);
        function deleteImg(fileName){
          socket.emit('deleteImg',fileName);
        }

        socket.on('updatedDatabase', function (data) {

        var members = document.getElementById("members");
        while (members.firstChild) {
          members.removeChild(members.lastChild);
        }
        dataBase=data;
        dataBase.forEach(element => loadImage(element));
        });

        socket.on('deletedImg', function (imgName) {
        var element = document.getElementById(imgName);
        var members = document.getElementById("members");
        members.removeChild(element);
        });

        socket.on('deleteAllImgs', function (data) {
          var members = document.getElementById("members");
          while (members.firstChild) {
            members.removeChild(members.lastChild);
          }
          dataBase=data;
        });

        socket.on('updatedLikes', function (data) {
        data.forEach(element => updateLikes(element));
        });


        function deleteAll(){
          if (confirm("Are you sure?") != true) 
            return;
          socket.emit('deleteAllImg', true);
        }
        function deleteAllData(){
          if (confirm("Are you sure? This will delete all images on the server as well.") != true) 
            return;
          socket.emit('deleteAllImgData', true);
        }
        function clearBigCanvas(){
          if (confirm("Are you sure?") != true) 
            return;
          socket.emit('clearBigCanvas', true);
        }