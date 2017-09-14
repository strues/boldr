import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function initCore(server) {
  // Parse cookies via standard express tooling
  server.use(cookieParser());

  // Parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // Parse application/json
  server.use(bodyParser.json());
}
