import os
import requests
from supabase import create_client, Client

# Your Supabase Credentials
SUPABASE_URL = "https://fhmiknqeztbtccwdurqt.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") # Loaded securely from GitHub Secrets

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_and_store_policies():
    print("Fetching latest renewable energy updates...")
    
    # Example: Fetching live data or scraping target portals
    # (Replace this sample data block with your actual BeautifulSoup/requests scraper logic for Indian RE portals)
    new_policies = [
        {
            "title": "Automated Sync Test: MNRE Solar Tariff Update",
            "state": "Central / National",
            "content": "Successfully tested autonomous background sync pipeline via GitHub Actions.",
            "source_url": "https://mnre.gov.in"
        }
    ]

    for policy in new_policies:
        response = supabase.table("policies").insert(policy).execute()
        print(f"Inserted into Supabase: {policy['title']}")

if __name__ == "__main__":
    fetch_and_store_policies()
