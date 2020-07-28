# workout-tracker

Create and track workouts with React and Postgres

## setup

Required software
1. node 12
2. postgres

### production setup (ssh'd into server as sudo root user 'clayton')

Required software (in addition to those required below the initial setup)
1. nginx

```bash
cd /var/www/
sudo git clone git@github.com:dorsett85/workout-tracker
sudo chown -R clayton:clayton workout-tracker/
cd workout-tracker/

# Add environment variables
cp .env.example.json .env.json
vim .env.json
# Add the following values to the .env.json file and save/exit
# "ENV": "production"
# "DB_CONNECTION": "postgres://clayton:password@localhost:5432/workout_tracker"

# Create workout_tracker database and assign new owner
psql -d postgres
CREATE DATABASE workout_tracker;
ALTER DATABASE workout_tracker OWNER TO clayton;
\q;

# Run migrations
npx knex --knexfile backend/db/knexfile.js  migrate:latest

# Build frontend
npm i
npm run build 
```

Next up we'll follow the tutorial at this link (starting from "Creating Unit Files", and update the .service file appropriately):

https://rollout.io/blog/running-node-js-linux-systemd/

And last, use this tutorial for setting up nginx (starting from "Step 4 — Setting Up Nginx as a Reverse Proxy Server"):

Step 4 — Setting Up Nginx as a Reverse Proxy Server
