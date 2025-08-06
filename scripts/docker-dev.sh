#!/bin/bash

# Next.js Auth0 Docker Development Script
# Bu script development ortamını başlatır ve yönetir

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
        print_warning ".env.local file not found. Creating from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_success ".env.local created from .env.example"
            print_warning "Please update .env.local with your actual configuration"
        else
            print_error ".env.example not found. Please create .env.local manually"
            exit 1
        fi
    else
        print_success ".env.local file found"
    fi
}

# Function to build and start development environment
start_dev() {
    print_status "Starting development environment..."
    
    # Stop any existing containers
    docker-compose -f docker-compose.dev.yml down
    
    # Build and start
    docker-compose -f docker-compose.dev.yml up --build -d
    
    print_success "Development environment started!"
    print_status "Application will be available at: http://localhost:3002"
    print_status "To view logs: docker-compose -f docker-compose.dev.yml logs -f"
}

# Function to stop development environment
stop_dev() {
    print_status "Stopping development environment..."
    docker-compose -f docker-compose.dev.yml down
    print_success "Development environment stopped"
}

# Function to restart development environment
restart_dev() {
    print_status "Restarting development environment..."
    stop_dev
    start_dev
}

# Function to show logs
show_logs() {
    print_status "Showing development logs..."
    docker-compose -f docker-compose.dev.yml logs -f
}

# Function to rebuild containers
rebuild_dev() {
    print_status "Rebuilding development containers..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build --no-cache
    docker-compose -f docker-compose.dev.yml up -d
    print_success "Development containers rebuilt and started"
}

# Function to clean up
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    print_success "Cleanup completed"
}

# Function to show status
show_status() {
    print_status "Development environment status:"
    docker-compose -f docker-compose.dev.yml ps
}

# Function to show help
show_help() {
    echo "Next.js Auth0 Docker Development Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start     Start development environment"
    echo "  stop      Stop development environment"
    echo "  restart   Restart development environment"
    echo "  logs      Show development logs"
    echo "  rebuild   Rebuild containers"
    echo "  cleanup   Clean up Docker resources"
    echo "  status    Show container status"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start      # Start development environment"
    echo "  $0 logs       # Show logs"
    echo "  $0 stop       # Stop environment"
}

# Main script logic
main() {
    case "${1:-start}" in
        "start")
            check_docker
            check_env_file
            start_dev
            ;;
        "stop")
            stop_dev
            ;;
        "restart")
            check_docker
            restart_dev
            ;;
        "logs")
            show_logs
            ;;
        "rebuild")
            check_docker
            rebuild_dev
            ;;
        "cleanup")
            cleanup
            ;;
        "status")
            show_status
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