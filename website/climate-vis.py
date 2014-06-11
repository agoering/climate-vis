from flask import Flask, url_for, redirect, render_template

app = Flask(__name__)

@app.route('/')
def home():
	return redirect(url_for('map'))

@app.route('/map')
def map():
	return render_template('map.html')
	
@app.route('/correlations')
def correlations():
	return render_template('correlations.html')

@app.route('/rate_correlations')
def rate_correlations():
	return render_template('rate_correlations.html')
	
if __name__ == '__main__':
	app.run(debug=True)