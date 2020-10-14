jQuery(function($){
  var myOption = "<option disabled>------</option>";
  var index = 2;
  $(myOption).insertBefore("#ofpopulacao option:nth-child("+index+")");
  $(myOption).insertBefore("#ofatv_gerad option:nth-child("+index+")");
  $(myOption).insertBefore("#ofdano option:nth-child("+index+")");
  $(myOption).insertBefore("#ofimpacto option:nth-child("+index+")");
  $(myOption).insertBefore("#ofuf option:nth-child("+index+")");
});
