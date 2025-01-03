from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)

# Prompt 文件路径配置
PROMPT_DIR = 'prompt'
PROMPT_FILES = {
    'promptD': 'prompt_D.json',
    'promptE': 'prompt_E.json'
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_prompt/<eval_type>')
def get_prompt(eval_type):
    if eval_type not in PROMPT_FILES:
        return 'Invalid evaluation type', 400
    
    try:
        prompt_path = os.path.join(PROMPT_DIR, PROMPT_FILES[eval_type])
        with open(prompt_path, 'r', encoding='utf-8') as f:
            prompt_content = f.read()
        return prompt_content
    except FileNotFoundError:
        return f'Prompt file not found: {prompt_path}', 404
    except Exception as e:
        return f'Error reading prompt file: {str(e)}', 500

@app.route('/start_eval', methods=['POST'])
def start_eval():
    try:
        data = request.get_json()
        eval_type = data.get('evalType')
        model = data.get('model')

        if not eval_type or not model:
            return jsonify({'error': 'Missing required parameters'}), 400

        # 这里添加你的评测逻辑
        # 例如：启动评测任务，返回任务ID等
        
        # 示例响应
        return jsonify({
            'status': 'success',
            'message': f'Started evaluation for {eval_type} using {model}',
            'evalType': eval_type,
            'model': model
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 