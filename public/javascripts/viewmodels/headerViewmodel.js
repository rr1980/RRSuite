var headerViewmodel = function(data) {
    var self = this;

    ko.mapping.fromJS(data, {}, self);

    // $(function() {
    //     $(".rr-nav-content").on('mousewheel', function(event, delta) {
    //         this.scrollLeft -= (delta * 60);
    //         event.preventDefault();
    //     });
    // });

    // $(function() {
    //     $('.rr-nav').resize(function(e) {
    //         console.log('width: %s, height: %s', $(this).width(), $(this).height());
    //     });
    //     // $(".rr-nav").resize(function() {
    //     //     console.log('.');

    //     // });
    // });


    // $(".rr-nav").resize(function(e) {

    //     // $('#wwqq').quickfit();
    //     // do something when #unicorns element resizes
    //     $('#jfjf').textfill({
    //         debug: true,
    //         success: function() {

    //         },
    //         fail: function(a) {


    //         }
    //     });
    // });

    self.toggle_Nav = function(event) {
        console.log(event);


        $.ajax({
            url: "/getFollows",
            type: "GET",
            cahce: false
        }).done(function(data) {
            $(".rr-nav-content").html("");
            for (var f in data) {
                var str = "<img class='rr-nav-content-img' src='" + data[f].preview.medium + "' />";
                $(".rr-nav-content").append(str);
            }
            $(".rr-nav").toggleClass('rr-nav-open');

            // function adjustHeights(elem) {
            //     var fontstep = 2;
            //     if ($(elem).height() > $(elem).parent().height() || $(elem).width() > $(elem).parent().width()) {
            //         $(elem).css('font-size', (($(elem).css('font-size').substr(0, 2) - fontstep)) + 'px').css('line-height', (($(elem).css('font-size').substr(0, 2))) + 'px');
            //         adjustHeights(elem);
            //     }
            // }
        });
    };

    // $("#blub").click(function() {

    // });

};