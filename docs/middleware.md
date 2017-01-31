# Middleware Documentation

RBAC (Role Based Access Control)
===========

This middleware provides role based restrictions on defined routes. To add RBAC to a route, locate your desired endpoint, in `src/routes/**/*.routes.js`.

Import the method you wish to apply, we'll use checkRole for this example.

```javascript
import { Router } from 'express';
import { checkRole } from '~/middleware/rbac';

const router = new Router();

router.get('/', checkRole('admin'), ctrl.get)
```

You may restrict whole sections of the API with `router.use(checkRole('admin'));`.
