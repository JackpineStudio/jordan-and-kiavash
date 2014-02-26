function scroll( e ) {
  var faces = $( '.faces' );
  if( window.pageYOffset > 400 ) {
    faces.css( 'visibility', 'visible' ).fadeIn( 'slow' );
  } else {
    faces.css( 'visibility', 'hidden' ).hide();
  }
}

$(function() {


  window.addEventListener( 'scroll', scroll, false );

  $( 'form input[type="email"], form input[type="text"], form textarea' ).each(function( e, i ) {
    
    $( this ).val( $( this ).data( 'value' ) );

    $( this ).on( 'focus', function( e ) {
      if( $( this ).val() === $( this ).data( 'value' ) ) {
        $( this ).val( '' ).addClass( 'filled' );
        return;
      }
    }).on( 'blur', function( e ) {
      if( $( this ).val() === '' ) {
        $( this ).val( $( this ).data( 'value' ) ).removeClass( 'filled' );
        return;
      }
    });
  });

  var form = $( '#mc-embedded-subscribe-form' );
  var submit;

  form.submit( function( e ) {
    
    // clean out form fields
    var required = $( 'form .required' );
    var count = 0;
    required.each( function( e, i ) {

      if( $( this ).val() != $( this ).data( 'value' ) ) {
        count++;
      }
    });

    if( count === required.length ) {
      submit = true;

      $( 'form input' ).each( function( e, i ) {
        if( $( this ).val() === $( this ).data( 'value' ) ) {
          $( this ).val( '' );
        }
      });
    }

    if( submit ) {
      // away we go!
      $( '.required' ).removeClass( 'needed' );
      $( '.error' ).hide();
      return;
    } else {
      $( '.error' ).show().html( 'Please fill in <em>all</em> required fields!' );
      $( '.required' ).each( function( e, i ) {
        if( $( this ).val() === $( this ).data( 'value' ) ) {
          $( this ).addClass( 'needed' );
        } else {
          $( this ).removeClass( 'needed' );
        }
      });
    }
    
    e.preventDefault();
  });
});