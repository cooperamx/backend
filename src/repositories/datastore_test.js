const uuid4 = require('uuid').v4;
const { Datastore } = require('@google-cloud/datastore');
const assert = require('assert');

const config = {
  environment: 'development',
};

// Creates a client
function getDatastoreClient(conf) {
  return new Datastore({ namespace: conf.environment });
}

class Task {
  constructor(description) {
    this.id = uuid4();
    this.description = description;
  }
}

async function saveTask(task) {
  const kind = 'Task';
  const datastore = getDatastoreClient(config);
  const taskKey = datastore.key([kind, task.id]);

  const persistTask = {
    key: taskKey,
    data: {
      id: task.id,
      description: task.description,
    },
  };

  // Saves the entity
  await datastore.save(persistTask);
  console.log(`Saved ${persistTask.key.name}: ${persistTask.data.description}`);

  // Rehydrated the entity
  const readTask = await datastore.get(taskKey);
  const rehydratedTask = new Task(readTask[0].description);
  rehydratedTask.id = readTask[0].id;
  console.log({ rehydratedTask });
  return rehydratedTask;
}

async function main() {
  const task1 = new Task('Buy milk');
  const task2 = new Task('Buy butter');

  const savedTask1 = await saveTask(task1);
  assert.deepEqual(task1, savedTask1);
  const savedTask2 = await saveTask(task2);
  assert.deepEqual(task2, savedTask2);
}

main();
