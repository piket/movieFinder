$(function(){
        $('.add-fav').submit(function(e){
            e.preventDefault();


            $.ajax({
                method: 'POST',
                url: $('.add-fav').attr('action'),
                data: $('.add-fav').serialize()
            }).done(function(data){
                console.log("Added",data);
                $('.favBtn').hide();
                $('.removeBtn').show();
                $('.remove-fav').attr('action','/favorites/'+data.id);
            });
        });

        $('.remove-fav').submit(function(e){
            e.preventDefault();

            $.ajax({
                method: 'DELETE',
                url: $('.remove-fav').attr('action')
            }).done(function(data){
                console.log("DELETED!",data);
                $('.favBtn').show();
                $('.removeBtn').hide();
            });
        });

       $('#dialog').dialog({
        autoOpen: false,
        dialogClass: "no-close",
        width: 400,
        modal: true,
        resizable: false,
        buttons: {
            "Yes": function() {
                $.ajax({
                    method: 'DELETE',
                    url: 'favorites/'+$('.selected').attr('id')
                }).done(function(data){
                    console.log("DELETED!",data);
                });
                var delRow = $('.selected').closest('div.row');
                delRow.slideUp('slow',function(){
                delRow.remove();
            });
                $(this).dialog('close');
            },
            "No": function() {
                $(this).dialog("close");
            }
        }
    });


    $('.deleteBtn').click(function(e){
        e.preventDefault();
        $('#dialog-title').text($(this).attr('data'));
        $(this).addClass('selected');
        $('#dialog').dialog('open');
    });


    $('.fav-list')

    // $('.deleteBtn').click(function(e) {
    //     var title = $(this).data();
    //     if(!Window.confirm("Are you sure you want to delete " + title + " from your favorites?")) {
    //         e.preventDefault();
    //     }
    });