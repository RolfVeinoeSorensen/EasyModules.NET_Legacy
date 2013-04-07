/// <reference path="/Scripts/Libraries/knockout-2.2.1.debug.js" />
// The Model
var data = {
    "Id": 1001,
    "Title": "Best blog ever",
    "Tags": "best tags blog",
    "ShortDesc": "This is a short knockout example to make sure ko is working within the modular structure created with mvc and ninject",
    "Content": "This is a short knockout example to make sure ko is working within the modular structure created with mvc and ninject.Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."
};

// The ViewModel
var viewmodel = {
    id: ko.observable(data.Id),
    title: ko.observable(data.Title),
    tags: ko.observable(data.Tags),
    shortDesc: ko.observable(data.ShortDesc),
    content: ko.observable(data.Content),
};

// Bind the ViewModel to the View using Knockout
ko.applyBindings(viewmodel);