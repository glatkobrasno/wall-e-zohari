import base64

class ImgOperations:
    def byteToString(byteImg):
        stringImg = byteImg.decode('ascii')
        return stringImg
    def b64ToImage(b64Img):
        decoded_data=base64.b64decode((b64Img))
        img_file = open('temporary/temporary.png', 'wb')
        img_file.write(decoded_data)
        img_file.close()