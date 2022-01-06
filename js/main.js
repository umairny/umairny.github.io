// On deocmument read 
$(document).ready(function() {

    //nav fuction page and pages show and hide
    $(".btn").click(function () {
        //add active class to nav buttons
        $(".btn").removeClass("active");
        $(this).addClass("active");

        //get the curret page
        var page = $(this).attr("href");
        
        //hide all pages slow
        $(".page").hide("slow");
        
        //Show page if design image animate else just show full page
        if (page == "#design"){
            $(page).show("fast", function(){
                $( ".img" ).first().show( "fast", function showNext() {
                        $( this ).next( ".img" ).show( "fast", showNext );
                });
            });
        }else{
            $(page).fadeIn("slow")
            $(".img").hide();
        }

    });
    

    //Hover navbar buttons logic
    $(".btn").hover(function(){
        $(this).animate({opacity:'1', fontSize: '1.75em'}, "fast");
    },function(){
        $(this).animate({ fontSize: '1.25em' }, "fast");
        $(this).animate({ opacity: '0.7', fontSize: '1.5em' });
    });
    // Mobile screen nav bar toggle
    $(".icon").click(function(){
        $("nav").toggle("slow");
            $(".btn").click(function () {
                $("nav").slideUp("fast");
                $(".btn").css({ opacity: '1'})
            });
    });
    //screen size show nav bar
    if($(window).width > 780) {
        $("nav").show("fast");
    }

    //designs Gallery
    //Hover on image effect
    $(".img").hover(function(){
        $(this).animate({ opacity: '1' }, "slow");
    },function(){
        $(this).animate({ opacity: '0.7'});
    });
    //design large image effect show image
    $(".img").click(function(e) {
        e.preventDefault();
        //creating an overlay full image
        var overlay = $("<div id='overlay'></div>");
            overlay.animate({ height: '100%' });
            overlay.appendTo("body");
        var imgLocation = $(this).css("background-image");
        //console.log(imgLocation.slice(-22, -2 ))
        var clicktohide = $("<h4>Click any where to go bcak</h4>").css({"background-color": "peru", "font-size": "200%", "text-align": "center"})
            clicktohide.appendTo(overlay);
        var enlargedImg = $("<img src=" + imgLocation.slice(-23, -2 ) + ">")
            enlargedImg.appendTo(overlay);
        //close overlay image
        $(overlay).click(function(){
            overlay.fadeOut('slow', function(){ overlay.remove(); });
        });
    });

    //design large video
    $(".you_btn").click(function(e) {
        e.preventDefault();
        //creating an overlay full image
        var overlay = $("<div id='overlay'></div>");
            overlay.animate({ height: '100%' });
            overlay.appendTo("body");
        var vidLocation = $(this).attr('name')
        //console.log(imgLocation.slice(-22, -2 ))
        var clicktohide = $("<h4>Close (X)</h4>").css({"background-color": "peru", "font-size": "200%", "text-align": "center", "cursor": "pointer"})
            clicktohide.appendTo(overlay);
        var enlargedImg = $("<iframe width='100%' height='100%' src=" + vidLocation + " title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>")
            enlargedImg.appendTo(overlay);
        //close overlay image
        $(clicktohide).click(function(){
            overlay.fadeOut('slow', function(){ overlay.remove(); });
        });
    });

    //Show more text in details
    $('.more').click(function(e) {
        e.preventDefault();
        $(this).text(function(i, t) {
          return t == 'less' ? 'more' : 'less';
        }).prev('.more-cont').slideToggle()
    });
    
});

//Javascrpt for sending email to me form contact form
const btn = document.getElementById('button');
document.getElementById('form')
    .addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_di5kfpk';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Send Message';
        alert('Thank you for contect me. I will get back to you soon!');
        document.getElementById("form").reset();
    }, (err) => {
        btn.value = 'Send Message';
        alert(JSON.stringify(err));
    });
});
