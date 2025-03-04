from doctr.io import DocumentFile
from doctr.models import ocr_predictor
import sys

# Load the OCR model
model = ocr_predictor(pretrained=True)

def extract_text(pdf_path):
    doc = DocumentFile.from_pdf(pdf_path)  # Load the PDF
    result = model(doc)  # Run OCR

    extracted_text = []
    for page in result.pages:
        for block in page.blocks:
            for line in block.lines:
                extracted_text.append(" ".join(word.value for word in line.words))

    return "\n".join(extracted_text)

if __name__ == "__main__":
    pdf_path = sys.argv[1]  # Get file path from the command line
    print(extract_text(pdf_path))
