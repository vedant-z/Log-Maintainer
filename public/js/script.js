// Asynchronous function to handle retrieval of logs
async function searchLogs() {
    // Fetch filter values
    const level = document.getElementById('level').value.toLowerCase();
    const message = document.getElementById('message').value;
    const resourceId = document.getElementById('resourceId').value;
    const timestamp = document.getElementById('timestamp').value;
    const traceId = document.getElementById('traceId').value;
    const spanId = document.getElementById('spanId').value;
    const commit = document.getElementById('commit').value;
    const parentResourceId = document.getElementById('parentResourceId').value;

    // Fetch advanced filter values
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filters = {
        level,
        message,
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        parentResourceId,
        startDate,
        endDate,
    };

    try {
        const response = await fetch('http://localhost:4000/search-logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
        });

        const results = await response.json();
        populateResults(results);
    } catch (error) {
        console.error('Error during search:', error);
    }
}

// Populate results into search results section
function populateResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    const messageContainer = document.getElementById('searchResultsMessage');
    const tableContainer = document.getElementById('searchResultsTable');

    // Clear existing results and messages
    resultsContainer.innerHTML = '';
    messageContainer.innerHTML = '';

    if (results.length === 0) {
        messageContainer.innerHTML = '<p>No results found. Please refine your search.</p>';
        tableContainer.style.display = 'none';
    } else {
        results.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${log.level}</td><td>${log.message}</td><td>${log.resourceId}</td><td>${log.timestamp}</td><td>${log.traceId}</td><td>${log.spanId}</td><td>${log.commit}</td><td>${log.metadata ? log.metadata.parentResourceId : ''}</td>`;
            resultsContainer.appendChild(row);
        });

        tableContainer.style.display = 'table';
    }
}

// Handles toggling of advanced filter button parameters 
function toggleAdvancedFilters() {
    const advancedFiltersSection = document.querySelector('.advanced-filters-section');
    const showHide = document.getElementById('showHide');

    advancedFiltersSection.style.display = (advancedFiltersSection.style.display === 'none') ? 'block' : 'none';

    const curVal = showHide.innerHTML;

    showHide.innerHTML = (curVal === 'Show') ? 'Hide' : 'Show';
    if (curVal === 'Hide') {
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        startDate.value = '';
        endDate.value = '';
    }
}
