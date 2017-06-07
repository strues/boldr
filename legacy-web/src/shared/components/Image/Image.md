# Image


### Usage
```javascript
<Image
    src="http://i.magaimg.net/img/frh.jpg"
    alt="A gorgeous sunset"
    width={1600}
    height={1200}
    queries={[
        {minWidth: 300,width: 300,height: 250,quality: 60},
        {minWidth: 600,width: 600,height: 350,quality: 60},
        {minWidth: 900,width: 900,height: 600,quality: 60},
        {minWidth: 1200,width: 1200,height: 800,quality: 60}
    ]}
    />
```

### Props:

Name    Type  Definition
--- | --- | ----
isLazy | boolean | lazy load the image
lazyDivideFactor | number | The division factor for the lazy image size
src | string | the source of the image
alt | string | the alt text
height | number | the base image height, to calculate proportions
width  | number | the base image width, to calculate proportions
queries | arrray | if provided, an <picture/> element with sources for each item of the array will be rendered.
className | string | custom css class name
onLoad | function | An optional handler which will be called with the onLoad event of the final image
lazySrc  | string | Optionally specify your own lazy src which is displayed initially.
