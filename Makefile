.PHONY: help install dev build start stop clean logs test

# Default target
help:
	@echo "Event Calendar - Available Commands:"
	@echo ""
	@echo "  make install    - Install all dependencies"
	@echo "  make dev        - Start development environment"
	@echo "  make build      - Build all services"
	@echo "  make start      - Start production environment"
	@echo "  make stop       - Stop all services"
	@echo "  make restart    - Restart all services"
	@echo "  make clean      - Remove containers and volumes"
	@echo "  make logs       - View logs from all services"
	@echo "  make logs-be    - View backend logs"
	@echo "  make logs-fe    - View frontend logs"
	@echo "  make test       - Run all tests"
	@echo "  make shell-be   - Open backend container shell"
	@echo "  make shell-fe   - Open frontend container shell"
	@echo "  make db-backup  - Backup MongoDB"
	@echo "  make db-restore - Restore MongoDB"

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "✅ Dependencies installed"

# Development
dev:
	@echo "Starting development environment..."
	docker-compose up -d
	@echo "✅ Services started"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:5000"

# Build
build:
	@echo "Building services..."
	docker-compose build
	@echo "✅ Build complete"

# Production start
start:
	@echo "Starting production environment..."
	docker-compose -f docker-compose.yml up -d
	@echo "✅ Services started"

# Stop services
stop:
	@echo "Stopping services..."
	docker-compose down
	@echo "✅ Services stopped"

# Restart services
restart:
	@echo "Restarting services..."
	docker-compose restart
	@echo "✅ Services restarted"

# Clean everything
clean:
	@echo "Cleaning up..."
	docker-compose down -v
	@echo "✅ Cleanup complete"

# View logs
logs:
	docker-compose logs -f

logs-be:
	docker-compose logs -f backend

logs-fe:
	docker-compose logs -f frontend

# Run tests
test:
	@echo "Running backend tests..."
	cd backend && npm test
	@echo "Running frontend tests..."
	cd frontend && npm test

# Shell access
shell-be:
	docker-compose exec backend sh

shell-fe:
	docker-compose exec frontend sh

# Database operations
db-backup:
	@echo "Backing up MongoDB..."
	docker-compose exec mongo mongodump --out=/tmp/backup
	docker cp event-calendar-mongo:/tmp/backup ./backup-$(shell date +%Y%m%d-%H%M%S)
	@echo "✅ Backup complete"

db-restore:
	@echo "Restoring MongoDB..."
	@read -p "Enter backup directory name: " backup; \
	docker cp $$backup event-calendar-mongo:/tmp/restore; \
	docker-compose exec mongo mongorestore /tmp/restore
	@echo "✅ Restore complete"

# Health check
health:
	@echo "Checking services..."
	@curl -s http://localhost:5000/api/v1/health && echo "✅ Backend is healthy" || echo "❌ Backend is down"
	@curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend is healthy" || echo "❌ Frontend is down"
