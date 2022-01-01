docker-compose -f docker-compose.production.yml run api bundle install
docker-compose -f docker-compose.production.yml up -d --build
docker-compose -f docker-compose.production.yml run api rails db:setup