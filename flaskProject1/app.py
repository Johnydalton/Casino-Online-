from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///casino.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    balance = db.Column(db.Integer, default=1000)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('index'))
        flash('Invalid username or password')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('signup'))
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('index'))
    return render_template('signup.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/roulette', methods=['GET', 'POST'])
@login_required
def roulette():
    number = None
    result = None
    if request.method == 'POST':
        bet_type = request.form['bet_type']
        bet_amount = int(request.form['bet_amount'])

        if bet_amount > current_user.balance:
            flash('Insufficient balance')
            return redirect(url_for('roulette'))

        number = random.randint(0, 36)
        result = 'lose'

        if bet_type == 'even' and number % 2 == 0 and number != 0:
            result = 'win'
            current_user.balance += bet_amount
        elif bet_type == 'odd' and number % 2 != 0:
            result = 'win'
            current_user.balance += bet_amount
        else:
            current_user.balance -= bet_amount

        db.session.commit()

    return render_template('roulette.html', number=number, result=result, balance=current_user.balance)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
