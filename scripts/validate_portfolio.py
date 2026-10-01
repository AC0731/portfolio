from html.parser import HTMLParser
from pathlib import Path


class PortfolioParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.project_articles = 0
        self.image_sources = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)

        if "id" in values:
            self.ids.append(values["id"])

        if tag == "article" and "project" in values.get("class", "").split():
            self.project_articles += 1

        if tag == "img":
            self.image_sources.append(values.get("src", ""))


def main() -> int:
    index = Path("index.html").read_text(encoding="utf-8")
    readme = Path("README.md").read_text(encoding="utf-8")

    parser = PortfolioParser()
    parser.feed(index)

    duplicate_ids = {
        value for value in parser.ids if parser.ids.count(value) > 1
    }

    assert not duplicate_ids, f"Duplicate HTML IDs: {sorted(duplicate_ids)}"
    assert parser.project_articles == 4, (
        f"Expected 4 project cards, found {parser.project_articles}"
    )
    assert all(parser.image_sources), "Every project image must have a src."
    assert Path("styles.css").exists(), "styles.css is missing."
    assert Path("script.js").exists(), "script.js is missing."

    combined = (index + "\n" + readme).lower()
    assert "junior technical applications" not in combined
    assert "supportops diagnostic portal" in combined
    assert "enterprise it support lab" in combined
    assert "saas foundation" in combined
    assert "curveclarity" in combined
    assert "limit:" in index.lower()

    print("Portfolio structure and positioning checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
