# Flag

Flag example:


### Usage

```jsx
import { Flag } from '@boldr/ui';

const Example = (props) => {
		return (
			<div>
        <Flag 
          asset={props => <img src="https://unsplash.it/1200/700?image=1063" />}
          alt="Foo Bar" 
          width={600} 
          height={400} 
          {...props}
        />
          Contents of the Flag which should be vertically centered.
        </Flag>
			</div>
		);
	}
```
