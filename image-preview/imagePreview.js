window.addEventListener('DOMContentLoaded', function()
{
    DragDrop.init(document.body);
});

var DragDrop = {
    element: undefined,
    isOver: false,
    init: function(element)
    {
        element.addEventListener('dragover', this.onDragOver);
        element.addEventListener('dragleave', this.onDragLeave);
        element.addEventListener('drop', this.onDrop);
        this.element = element;
    },
    
    onDragOver: function(evt)
    {
        if (!DragDrop.isOver) 
        {
            this.classList.add('drag-target');
            DragDrop.isOver = true;
        }
        evt.preventDefault();
    },
    
    onDragLeave: function()
    {
        DragDrop.removeDragTarget();
    },
    
    onDrop: function(evt)
    {
        var files = evt.dataTransfer.files,
            image, url;
        
        for (var i = 0; i < files.length; i++)
        {
            if (files[i].type.indexOf('image') > -1)
            {
                url = window.URL.createObjectURL(files[i]);
                image = ImageHelper.createImage(url, files[i].name);
                this.appendChild(image);
            }
        }
        evt.preventDefault();
        DragDrop.removeDragTarget();
    },
    
    removeDragTarget: function()
    {
        this.element.classList.remove('drag-target');
        DragDrop.isOver = false;
    }
};

var ImageHelper = {
    image: (function()
    {
        var image = document.createElement('img');
        
        image.className = 'image-preview';
        
        return image;
    }()),
    
    createImage: function(src, text)
    {
        var image = this.image.cloneNode();
    
        image.src = src;
        image.alt = text;
    
        return image;
    }
};