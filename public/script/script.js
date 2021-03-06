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

    if ($('.disabled') && $('.fav-list'))
        var page = parseInt($('.disabled').children().attr('href'));

    var showFavs = function () {
        var limit = 5;

        var favList = $('.fav-list');


        var pageBtnList = $('.pageBtn');
        // console.log("pageBtn length:",pageBtnList.length,"favList length:",(favList.length-1)/limit)
        if(pageBtnList.length > Math.ceil((favList.length)/limit)) {
            // console.log('remove last pageBtn. Current page:',page)
            if ($(pageBtnList).eq(pageBtnList.length-1).parent().hasClass('disabled')){
                page--;
                // console.log("new page:",page);
            }
            $(pageBtnList).eq(pageBtnList.length-1).remove();
            // $(pageBtnList).eq(pageBtnList.length-2).parent().addClass('disabled');
        }

        favList.each(function(idx,item){
            if (idx >= (page - 1)*limit && idx < ((page - 1)*limit + limit)) {
                $(item).css({display:'inline'});
                // $(item).slideDown('slow');
            }
            else {
                $(item).css({display:'none'});
                // $(item).slideUp('slow');
            }
        });

        if ($('#previous').attr('href') == 0) {
            $('#previous').hide();
        }
        else {
            $('#previous').show();
        }

        if ($('#next').attr('href') > Math.ceil(favList.length/limit)) {
            $('#next').hide();
        }
        else {
            $('#next').show();
        }
    }

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
            delRow.fadeOut('slow',function(){
                delRow.remove();
                showFavs();
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

showFavs();

$('.pageBtn').click(function(e){
    e.preventDefault();

    page = parseInt($(this).attr('href'));
    $('#previous').attr('href',page-1);
    $('#next').attr('href',page+1);

    showFavs();
    $('.disabled').removeClass('disabled');
    $(this).parent().addClass('disabled');
});

$('#previous').click(function(e){
    e.preventDefault();

    page = parseInt($(this).attr('href'));
    $('#previous').attr('href',page-1);
    $('#next').attr('href',page+1);

    showFavs();
    $('.disabled').removeClass('disabled');
    $('.pageBtn').each(function(idx,item){
        if(parseInt($(item).attr('href')) == page){
            $(item).parent().addClass('disabled');
        }
    });
});

$('#next').click(function(e){
    e.preventDefault();

    page = parseInt($(this).attr('href'));
    $('#previous').attr('href',page-1);
    $('#next').attr('href',page+1);

    showFavs();
    $('.disabled').removeClass('disabled');
    $('.pageBtn').each(function(idx,item){
        if(parseInt($(item).attr('href')) == page){
            $(item).parent().addClass('disabled');
        }
    });
})

    // $('.deleteBtn').click(function(e) {
    //     var title = $(this).data();
    //     if(!Window.confirm("Are you sure you want to delete " + title + " from your favorites?")) {
    //         e.preventDefault();
    //     }
    if ($('#tagtext')) {
        $('#tagtext').focus();
    }

    $('#addTag').submit(function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize()
        });
        $('#alert').text($('#tagtext').val() + ' has been added to ' + $('#movieTitle').val()).show();
        $('#tagtext').val('');
    });

    $('#commentForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize()
        }).done(function(data) {
            $('.comments').append('<li class="list-group-item">'+data.text+'</li>');
            $('#commentText').val('');
        });
    });

    $('.favMovie').hover(function(e){
        $(this).children('.btn').slideDown();
    }, function(e) {
        $(this).children('.btn').slideUp();
    })

    $('.jumbotron').hover(function(e){
        $(this).children('.addTagBtn').slideDown();
    }, function(e) {
        $(this).children('.addTagBtn').slideUp();
    })

    $('#addATag').click(function(e) {
        console.log("+ btn clicked")
        e.preventDefault();
        $('#tagForm').slideDown();
    });

    $('#tagForm').submit(function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize()
        }).done(function(tag) {
            $('.jumbotron').append('<a href="/favorites/'+tag.name.replace(/ /g,'+')+'" class="btn btn-default">'+tag.name+'</a>')
            $('#tagtext').val('');
            $('#tagForm').slideUp();
        });
        // $('#alert').text($('#tagtext').val() + ' has been added to ' + $('#movieTitle').val()).show();
    });

});