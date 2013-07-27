window.addEventListener('DOMContentLoaded', function()
{
    Document.init();
    Canvas.init();
});

var Canvas = {
    el: null,
    context: null,
    
    init: function()
    {
        this.el = document.getElementById('canvas');
        this.context = this.el.getContext('2d');
    },
    
    drawImage: function(image)
    {
        this.el.width = image.width;
        this.el.height = image.height;
        this.context.drawImage(image, 0, 0);
    },
    
    applyGrayscale: function()
    {
        var imageData = this.context.getImageData(0, 0, this.el.width, this.el.height),
            worker = new Worker('ImageProcessor.js');
        
        var me = this;
        worker.addEventListener('message', function(evt)
        { 
            me.context.putImageData(evt.data, 0, 0); // aplicamos os pixels alterados 
            this.terminate(); // terminamos o worker
        });
        worker.postMessage(imageData);
    }
};

var Document = {
    
    init: function()
    {
        document
            .getElementById('file')
            .addEventListener('change', this.onFileChange.bind(this));
        
        document
            .getElementById('grayscale')
            .addEventListener('click', this.onGrayscaleLinkClick);
    },
    
    onGrayscaleLinkClick: function()
    {
        Canvas.applyGrayscale();
    },
    
    onFileChange: function(evt)
    {
        var image = new Image(),
            file = evt.target.files[0],
            url = window.URL.createObjectURL(file);
        
        image.addEventListener('load', this.onImageLoad);
        
        image.src = url;
        
    },
    
    onImageLoad: function()
    {   
        Canvas.drawImage(this);
    }

};