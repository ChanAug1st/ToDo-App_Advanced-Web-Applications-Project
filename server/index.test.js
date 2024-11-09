import { expect } from 'chai';
import fetch from 'node-fetch';

const base_url = 'http://localhost:3001/';

describe('GET /tasks', () => {
    it('should get all tasks', async () => {
        const response = await fetch(base_url + 'tasks');
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('array').that.is.not.empty;
        expect(data[0]).to.include.keys('id', 'description');
    });
});

describe('POST /create', () => {
    it('should post a task', async () => {
        const response = await fetch(base_url + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: 'Task from unit test' })
        });

        const data = await response.json();
        expect(response.status).to.equal(201); 
        expect(data).to.be.an('object');
        expect(data).to.include.keys('id', 'description');
    });

    it("should not create a new task with zero length description", async () => {
        const token = await getToken(email);
        const response = await fetch(baseUrl + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({ description: null })
        });
        const data = await response.json();

        expect(response.status).to.equal(400, data.error);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    });
});

describe('DELETE /delete/:id', () => {
  it('should delete a task with id 1', async () => {
    const response = await fetch(base_url + 'delete/1', {
        method: 'DELETE'
    });

    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an('object');
    expect(data).to.have.property('message').that.includes('Task deleted successfully');
  });

  it ('should not delete a task with SQL injection',async() => {
    const response = await fetch(base_url + 'delete/id=0 or id > 0',{
      method: 'delete'
    })
    const data = await response.json();
    expect(response.status).to.equal(500);
    expect(data).to.be.an('object');
    expect(data).to.include.all.keys('error');
  });

});
