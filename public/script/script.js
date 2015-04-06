$(function(){
       $('#dialog').dialog({
        autoOpen: false,
        dialogClass: "no-close",
        width: 400,
        modal: true,
        resizable: false,
        buttons: {
            "Yes": function() {
                $('#selected').submit();
            },
            "No": function() {
                $(this).dialog("close");
            }
        }
    });


    $('.deleteBtn').click(function(e){
        e.preventDefault();
        var form = $(e.target).parent();
        $('#dialog-title').text($(this).attr('data'));
        $(this).parent().attr('id','selected');
        $('#dialog').dialog('open');
    });




    // $('.deleteBtn').click(function(e) {
    //     var title = $(this).data();
    //     if(!Window.confirm("Are you sure you want to delete " + title + " from your favorites?")) {
    //         e.preventDefault();
    //     }
    });