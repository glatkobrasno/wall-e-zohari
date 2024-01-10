import qrcode
import cv2


def generate_code(data: str, save_path: str):
    qr = qrcode.QRCode(version=1,
                       error_correction=qrcode.ERROR_CORRECT_L,
                       box_size=2,
                       border=2)

    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(save_path)


def read_code(image_path: str) -> str:
    img = cv2.imread(image_path)
    detector = cv2.QRCodeDetector()
    data, _, _ = detector.detectAndDecode(img) # metoda prima 3 argumenta, ali nas zanima samo data, to jest kod.
    return data


# ako je pozvana ova datoteka direktno
if __name__ == "__main__":
    MANUAL = False  # True za ručni unos
    code_data = "KuhajIT"
    save_path = "outputcode.png"
    code_to_read = "inputcode.png"

    if MANUAL:
        code_data = input("code_data: ")
        save_path = input("save_path: ")
        code_to_read = input("code_to_read: ")

    print("Making code...")
    generate_code(code_data, save_path)

    print("Reading code...")
    result = read_code(code_to_read)
    print(f"Code read! Result: {result}")
