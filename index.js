const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const channel = core.getInput('channel') || 'stable';

    // Step 1: Download GPG key using wget and capture output
    let gpgKeyOutput = '';
    await exec.exec('wget', ['-q', '-O', '-', 'https://apt.acton-lang.io/acton.gpg'], {
      listeners: {
        stdout: (data) => {
          gpgKeyOutput += data.toString();
        },
      },
    });

    // Step 2: Add the GPG key to apt-key
    await exec.exec('sudo', ['apt-key', 'add', '-'], {
      input: Buffer.from(gpgKeyOutput),
    });

    // Step 3: Add the correct APT repository for the selected channel
    const repoUrl = channel === 'tip'
      ? 'http://aptip.acton-lang.io/'
      : 'http://apt.acton-lang.io/';

    await exec.exec('sudo', [
      'sh',
      '-c',
      `echo "deb [arch=amd64] ${repoUrl} ${channel} main" | sudo tee /etc/apt/sources.list.d/acton.list`
    ]);

    // Step 4: Update and install Acton
    await exec.exec('sudo', ['apt-get', 'update']);
    await exec.exec('sudo', ['apt-get', 'install', '-qy', 'acton']);

    // Verify Acton installation
    await exec.exec('acton', ['version']);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
