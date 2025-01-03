document.addEventListener('DOMContentLoaded', () => {
    const evalForm = document.getElementById('evalForm');
    const configSection = document.getElementById('configSection');
    const configForm = document.getElementById('configForm');
    const promptContent = document.getElementById('promptContent');

    // 处理第一个表单提交
    evalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const evalType = document.querySelector('input[name="evalType"]:checked').value;
        
        try {
            // 从后端获取对应的 Prompt 内容
            const response = await fetch(`/get_prompt/${evalType}`);
            if (!response.ok) {
                throw new Error('Failed to load prompt');
            }
            const data = await response.json();
            
            // 显示 Prompt 内容
            document.getElementById('promptName').textContent = data.name;
            document.getElementById('promptDescription').textContent = data.description;
            document.getElementById('promptSystem').textContent = data.prompts.system;
            document.getElementById('promptGeneral').textContent = data.prompts.general;
            
            // 显示配置部分
            configSection.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            alert('加载 Prompt 失败，请重试');
        }
    });

    // 处理配置表单提交
    configForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const evalType = document.querySelector('input[name="evalType"]:checked').value;
        const model = document.querySelector('input[name="model"]:checked').value;

        try {
            const response = await fetch('/start_eval', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    evalType,
                    model
                })
            });

            if (!response.ok) {
                throw new Error('Evaluation failed');
            }

            const result = await response.json();
            alert('评测开始成功！');
            // 这里可以添加更多的逻辑，比如跳转到结果页面等
            
        } catch (error) {
            console.error('Error:', error);
            alert('评测启动失败，请重试');
        }
    });
}); 