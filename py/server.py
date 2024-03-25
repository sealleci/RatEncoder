# Original code lost, this file is reworked one.

from flask import Flask, request, jsonify

from .rat_code import rat_encode, rat_decode

app = Flask(__name__)


@app.route("/re", methods=["POST"])
def handle_request():
    data = request.get_json()
    cnv_type = data.get("cnv_type")
    text = data.get("text")
    result = ""

    if cnv_type == "encode":
        result = rat_encode(text)
    elif cnv_type == "decode":
        result = rat_decode(text)

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6324)
