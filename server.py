from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def show_mainpage():
    return render_template('mainpage.html')

@app.route('/start', methods=['GET', 'POST'])
def start_gameplay():
    cards_number = int(request.form.get('cards'))
    levels = {'easy': cards_number*8,
              'medium': cards_number*6,
              'hard': cards_number*3}
    chosen_level = request.form.get('level')
    difficulty = levels[chosen_level]
    return render_template('gameplay.html',
                           cards_number = cards_number,
                           difficulty = difficulty)









if __name__ == '__main__':
    app.run(
        debug=True,
        port=5000)