## Formatters

This folder will have functions to format data returned by queries in the backend to fit into the current implementation of components while doing less work. They map data returned from the backend to that required by the existing components

> I have decided to put it in this folder since the folder will contain all operations that do data exchange between our frontend and the api
 
 I have done this because of the changing requirements and data layer of our backend. We stand a risk of changing our components whenever the backend changes
 
 In my opinion, instead of always modifying our components when the backend changes. We can just reformat our data before we pass it to the component.
 
 By doing this, we remain with the current implementation of components, hence no change in tests, snapshots and all we need to do is to change the data formatting method that maps data from the backend to data expected by the components