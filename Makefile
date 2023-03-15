scrape_courses:
	@echo "Scraping courses for $(year):";
	@cd webscraper; \
	if [ -d "$(year)" ]; then \
		echo "Directory exists"; \
	else \
		echo "Directory does not exist. Creating one."; \
		mkdir "$(year)"; \
	fi; \
	ts-node courseTitleCrawler.ts "$(year)"; \
	python3 main.py "$(year)"; \
	ts-node genPrereqsOf.ts "$(year)"; \
	ts-node scrapeDescription.ts "$(year)";
