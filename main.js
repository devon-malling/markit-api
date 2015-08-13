// API at http://dev.markitondemand.com/#stockquote
// Number formatter
function nFormatter(num) {
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
    if (num >= 10){
      return (num).toFixed(2);
    }
    if (num<= 9){
      return (num).toFixed(2)
    }
    if (num <= 1) {
      return (num).toFixed(2);
    }
     return num;
    
}

var getQuote = function(symbol){
// Ajax call
  $.ajax({
    dataType:'jsonp',
    url:'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol,
    success:function(data) {
        $('h3').html(data.Name.toUpperCase())
        $('.last-price').html(data.LastPrice)
        $('.change').html(nFormatter(data.Change) + ' ' + '( ' + nFormatter(data.Change / data.LastPrice * 100) + '%)')
        $('.range').html(data.Low + ' - ' + data.High)
        $('.open').html(nFormatter(data.Open))
        $('.volume').html(nFormatter(data.Volume))
        $('.market-cap').html(nFormatter(data.MarketCap)) 
        $('.time-stamp').html('As of ' + data.Timestamp.slice(10,19))
    }
});
}
getQuote('MSFT');

$('.quote-form').on('submit', function(e){
	e.preventDefault();
	getQuote($(this).find('.quote-form-text').val());
});