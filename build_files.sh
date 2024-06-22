# Create and activate a virtual environment
python3.9 -m venv venv
source .venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

python3.9 manage.py collectstatic