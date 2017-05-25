Default Card example:

    <Card
        to="/page"
        title="Best Page Ever"
        text="This Card teases a different page with an image, a headline and a short descrition."
        asset={props => <img src="http://placehold.it/350x150" {...props}/>}
        />

Card with actions example:

        <Card
            to="/page"
            title="Best Page Ever"
            text="This Card teases a different page with an image, a headline and a short descrition."
            asset={props => <img src="http://placehold.it/350x150" {...props}/>}
            actions={<button>Click me</button>}
            />
