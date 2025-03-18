const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const channel = core.getInput('channel') || 'stable';

    // Step 1: Download GPG key using wget and save to /etc/apt/keyrings/acton.asc
    let gpgKeyOutput = '';
    await exec.exec('sudo', ['wget', '-q', '-O', '/etc/apt/keyrings/acton.asc', 'https://apt.acton-lang.io/acton.gpg'], {
      listeners: {
        stdout: (data) => {
          gpgKeyOutput += data.toString();
        },
      },
    });

    // Step 2: Add the correct APT repository for the selected channel
    const repoUrl = channel === 'tip'
      ? 'http://aptip.acton-lang.io/'
      : 'http://apt.acton-lang.io/';

    await exec.exec('sudo', [
      'sh',
      '-c',
      `echo "deb [signed-by=/etc/apt/keyrings/acton.asc] ${repoUrl} ${channel} main" | sudo tee /etc/apt/sources.list.d/acton.list`
    ]);

    // Step 3: Update and install Acton
    await exec.exec('sudo', ['apt-get', 'update']);
    await exec.exec('sudo', ['apt-get', 'install', '-qy', 'acton']);

    // Verify Acton installation
    await exec.exec('acton', ['version']);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
