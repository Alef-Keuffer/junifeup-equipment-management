#!/bin/bash

BASE_URL="http://localhost:3000/api/equipment"

# Helper function to pretty print JSON if python is available, otherwise just print
pretty_json() {
  python3 -m json.tool 2>/dev/null || cat
}

echo "=========================================="
echo "🧪 Testing Equipment Management System API"
echo "=========================================="

echo -e "\n[1] GET /api/equipment (List all equipment - Top 3 results shown)"
echo "-----------------------------------------------------------------"
curl -s "$BASE_URL" | pretty_json | head -n 30
echo "..."

echo -e "\n\n[2] POST /api/equipment (Create new equipment)"
echo "-----------------------------------------------------------------"
RANDOM_SN="TEST-SN-$RANDOM"
POST_DATA=$(cat <<EOF
{
  "name": "API Test Laptop",
  "category": "Laptop",
  "serial_number": "$RANDOM_SN",
  "status": "Available",
  "location": "Test Office",
  "purchase_date": "2024-01-01"
}
EOF
)

CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL" -H "Content-Type: application/json" -d "$POST_DATA")
echo "$CREATE_RESPONSE" | pretty_json

# Extract the ID from the JSON response using python or basic grep
NEW_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id": *[0-9]*' | grep -o '[0-9]*' | head -1)

if [ -z "$NEW_ID" ]; then
  echo -e "\n❌ Failed to extract ID from creation response. Aborting further tests."
  exit 1
fi

echo -e "\n\n[3] GET /api/equipment/$NEW_ID (Get the newly created equipment)"
echo "-----------------------------------------------------------------"
curl -s "$BASE_URL/$NEW_ID" | pretty_json

echo -e "\n\n[4] PUT /api/equipment/$NEW_ID (Update the equipment)"
echo "-----------------------------------------------------------------"
PUT_DATA=$(cat <<EOF
{
  "name": "API Test Laptop (Updated)",
  "category": "Laptop",
  "serial_number": "$RANDOM_SN-UPDATED",
  "status": "Assigned",
  "location": "Remote",
  "purchase_date": "2024-01-02"
}
EOF
)
curl -s -X PUT "$BASE_URL/$NEW_ID" -H "Content-Type: application/json" -d "$PUT_DATA" | pretty_json

echo -e "\n\n[5] DELETE /api/equipment/$NEW_ID (Delete the equipment)"
echo "-----------------------------------------------------------------"
DELETE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE_URL/$NEW_ID")
if [ "$DELETE_STATUS" == "204" ]; then
    echo "✅ Successfully deleted (HTTP 204 No Content)"
else
    echo "❌ Delete failed with HTTP $DELETE_STATUS"
fi

echo -e "\n\n[6] GET /api/equipment/$NEW_ID (Verify it's gone)"
echo "-----------------------------------------------------------------"
curl -s "$BASE_URL/$NEW_ID" | pretty_json

echo -e "\n\n=========================================="
echo "🎉 API Testing Complete!"
echo "=========================================="
