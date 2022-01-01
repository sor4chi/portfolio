exec docker-compose -f docker-compose.production.yml run api bundle install
exec docker-compose -f docker-compose.production.yml run api rails db:setup
exec docker-compose -f docker-compose.production.yml up -d --build