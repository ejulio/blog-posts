self.addEventListener('message', function(evt)
{
    var data = evt.data;
    ImageProcessor.applyGrayscale(data.data);  
    postMessage(data);  
});

var ImageProcessor = {
    applyGrayscale: function(data)
    {
        var red, 
            green, 
            blue, 
            sum;
       for (var i = 0; i < data.length; i += 4)
        {
            red = data[i] * 0.2126;
            green = data[i + 1] * 0.7152;
            blue = data[i + 2] * 0.0722;
            
            sum = red + green + blue;
            
            data[i] = sum;
            data[i + 1] = sum;
            data[i + 2] = sum;
            //data[i + 3] = 50; não mudamos a camada alpha
        }
    }
};