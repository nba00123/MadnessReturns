function reinitIframe(frameId) {
    var iframe = document.getElementById(frameId);
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var selfHeight = iframe.height;
        var height = Math.max(bHeight, dHeight);
        iframe.height = height;
        fixParentHeight(frameId, 'mainFrame');
    } catch (ex) {
    }
}

function fixParentHeight(chindId, parentId) {
    if (this.parent.document.getElementById(parentId).scrollHeight < document.getElementById(chindId).height) {
        this.parent.document.getElementById(parentId).height = document.getElementById(chindId).height;
    }
}


function activeMe(index){
    $('ul li').each(function(id) {
      $('ul li')[id].removeClass('active');
    });
    $('ul li')[index-1].addClass('active');
}




function updateUser(index) {
    $.ajax({
        url : '/modify_user?user_name=' + $('#userName' + index).html() + '&user_lv=' + $('#select' + index).val(),
        success : function(data) {
            alert(data);
        }
    });
}

function deleteUser(index) {
    $.ajax({
        url : '/delete_user?user_name=' + $('#userName' + index).html(),
        success : function(data) {
            alert(data);
            $('#user' + index).remove();
        }
    });
}

function deleteServer(serverId) {
    $.ajax({
        url : '/delete_server?server_id=' + serverId,
        success : function(data) {
            alert(data);
            $('#server' + serverId).remove();
        }
    });
}

function viewServer(serverId) {
    $.ajax({
        url : 'modify_server?server_id=' + serverId
    });
}

function deleteServerGroup(server_group_id) {
    $.ajax({
        url : '/delete_server_group?server_group_id=' + server_group_id,
        success : function(data) {
            alert(data);
            $('#server_group' + server_group_id).remove();
        }
    });
}

function startServer(serverId) {
    if ($('#groupStatus').text() == 'False'){
       alert('请先开启group!');
       return;
    }
    $.ajax({
        url : '/startServer',
        method : 'post',
        data : {
            'server_id' : serverId
        },
        beforeSend : function() {
            $('#startServerButton span').text('开服中... waitting');
        }
    });
    checkStartServer = setInterval(function() {
        $.ajax({
            url : '/getServerStatus',
            data : {
                'server_id' : serverId
            },
            method : 'post',
            dataType : 'json',
            success : function(data) {
                if (data.online) {
                    clearInterval(checkStartServer);
                    $('#startServerButton').hide();
                    $('#serverFuncBtn').removeClass('hide');
                }
            }
        });
    }, 5000);
}


function stopServer(serverId){
    $.ajax({
        url:'/stopServer',
        data:{'server_id':serverId},
        method:'post',
        dataType:'json',
         beforeSend : function() {
            $('#stopServerButton span').text('关服中... waitting');
        }
    });
    checkStopServer = setInterval(function() {
        $.ajax({
            url : '/getServerStatus',
            data : {
                'server_id' : serverId
            },
            method : 'post',
            dataType : 'json',
            success : function(data) {
                if (!data.online) {
                   location.reload();
                }
            }
        });
    }, 5000);
}

function admin() {
    light = new LightFace.IFrame({
        height : 720,
        width : 1280,
        url : '/admin',
        title : '后台调试管理'
    }).addButton('Close', function() {
        light.close();
    }, true).open();
}

function recharge() {
    light = new LightFace.IFrame({
        height : 720,
        width : 1280,
        url : '/dumyrecharge',
        title : '模拟充值'
    }).addButton('Close', function() {
        light.close();
    }, true).open();
}



function debugServer(serverId) {
   url = '/debugServer?serverId=' + serverId,
   window.open(url);

}

function deleteOperator(operatorId){
    $.ajax({
       url: '/delete_operator',
       method:'post',
       data:{'operator_id':operatorId},
       dataType:'json',
       success:function(data){
           if (data.is_success){
               $('#operator' + operatorId).remove();
           }
           alert(data.msg);
       } 
    });
    
}

function updateGroupDB(serverGroupId){
    $.ajax({
        url:'/update_group_server?',
        data:{
            'id':serverGroupId
        },
        beforeSend:function(){
            $('#updateDBButton').attr('disabled', 'disabled');
        }
        
    })
    
    
}




















