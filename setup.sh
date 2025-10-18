
## 5. Setup Script

**setup.sh**
```bash
#!/bin/bash

echo "Setting up CiKA Website..."

echo "Creating directory structure..."
mkdir -p frontend/src/{components,pages,contexts}
mkdir -p backend/src

echo "Setup complete!"
echo "Run: docker-compose up --build"