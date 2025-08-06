#!/bin/bash

# Next.js Auth0 Docker Production Script
# Bu script production ortamını başlatır ve yönetir

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop or Docker Engine."
        exit 1
    fi
    print_success "Docker is running"
}

# Function to check if .env.local exists
check_env_file() {
    if [ ! -f ".env.local" ]; then
        print_error ".env.local file not found. Please create it with your production configuration."
        exit 1
    fi
    print_success ".env.local file found"
}

# Function to check environment variables
check_env_vars() {
    print_status "Checking environment variables..."
    
    required_vars=(
        "AUTH0_SECRET"
        "AUTH0_BASE_URL"
        "AUTH0_ISSUER_BASE_URL"
        "AUTH0_CLIENT_ID"
        "AUTH0_CLIENT_SECRET"
        "NEXTAUTH_URL"
        "NEXTAUTH_SECRET"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if ! grep -q "^${var}=" .env.local; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        print_warning "Missing environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        print_warning "Please update .env.local with all required variables"
    else
        print_success "All required environment variables found"
    fi
}

# Function to build and start production environment
start_prod() {
    print_status "Starting production environment..."
    
    # Stop any existing containers
    docker-compose down
    
    # Build and start
    docker-compose up --build -d
    
    print_success "Production environment started!"
    print_status "Application will be available at: http://localhost:3002"
    print_status "To view logs: docker-compose logs -f"
}

# Function to start production with Nginx
start_prod_nginx() {
    print_status "Starting production environment with Nginx..."
    
    # Stop any existing containers
    docker-compose down
    
    # Build and start with Nginx
    docker-compose --profile production up --build -d
    
    print_success "Production environment with Nginx started!"
    print_status "Application will be available at: http://localhost"
    print_status "To view logs: docker-compose logs -f"
}

# Function to stop production environment
stop_prod() {
    print_status "Stopping production environment..."
    docker-compose down
    print_success "Production environment stopped"
}

# Function to restart production environment
restart_prod() {
    print_status "Restarting production environment..."
    stop_prod
    start_prod
}

# Function to show logs
show_logs() {
    print_status "Showing production logs..."
    docker-compose logs -f
}

# Function to rebuild containers
rebuild_prod() {
    print_status "Rebuilding production containers..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    print_success "Production containers rebuilt and started"
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to show status
show_status() {
    print_status "Production environment status:"
    docker-compose ps
}

# Function to check health
check_health() {
    print_status "Checking application health..."
    
    # Wait for application to start
    sleep 10
    
    if curl -f http://localhost:3002 > /dev/null 2>&1; then
        print_success "Application is healthy"
    else
        print_error "Application health check failed"
        exit 1
    fi
}

# Function to backup environment
backup_env() {
    print_status "Creating environment backup..."
    cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
    print_success "Environment backup created"
}

# Function to restore environment
restore_env() {
    if [ -z "$1" ]; then
        print_error "Please specify backup file to restore"
        exit 1
    fi
    
    if [ ! -f "$1" ]; then
        print_error "Backup file not found: $1"
        exit 1
    fi
    
    print_status "Restoring environment from backup..."
    cp "$1" .env.local
    print_success "Environment restored from backup"
}

# Function to show help
show_help() {
    echo "Next.js Auth0 Docker Production Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start         Start production environment"
    echo "  start-nginx   Start production environment with Nginx"
    echo "  stop          Stop production environment"
    echo "  restart       Restart production environment"
    echo "  logs          Show production logs"
    echo "  rebuild       Rebuild containers"
    echo "  cleanup       Clean up Docker resources"
    echo "  status        Show container status"
    echo "  health        Check application health"
    echo "  backup        Backup environment file"
    echo "  restore FILE  Restore environment from backup"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start           # Start production environment"
    echo "  $0 start-nginx     # Start with Nginx"
    echo "  $0 logs            # Show logs"
    echo "  $0 stop            # Stop environment"
    echo "  $0 backup          # Backup environment"
    echo "  $0 restore backup  # Restore from backup"
}

# Main script logic
main() {
    case "${1:-start}" in
        "start")
            check_docker
            check_env_file
            check_env_vars
            start_prod
            check_health
            ;;
        "start-nginx")
            check_docker
            check_env_file
            check_env_vars
            start_prod_nginx
            check_health
            ;;
        "stop")
            stop_prod
            ;;
        "restart")
            check_docker
            restart_prod
            ;;
        "logs")
            show_logs
            ;;
        "rebuild")
            check_docker
            rebuild_prod
            ;;
        "cleanup")
            cleanup
            ;;
        "status")
            show_status
            ;;
        "health")
            check_health
            ;;
        "backup")
            backup_env
            ;;
        "restore")
            restore_env "$2"
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 