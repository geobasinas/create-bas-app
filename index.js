#!/usr/bin/env node
import { execa } from 'execa';

async function main() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error('Please provide a project name:');
    console.error('create-bas-app <project-name>');
    process.exit(1);
  }

  try {
    // Run create-next-app with interactive prompts
    console.log('Setting up Next.js...');
    await execa('npx', [
      'create-next-app@latest',
      projectName
    ], { stdio: 'inherit' });

    // Change to project directory
    process.chdir(projectName);

    // Add shadcn-ui
    console.log('\nInstalling shadcn/ui...');
    await execa('npx', [
        'shadcn@latest',
        'init',
        '-d'
    ], { stdio: 'inherit' });

    // add all the shacn-ui components
    console.log('\nInstalling shadcn/ui components...');
    await execa('npx', [
        'shadcn@latest',
        'add',
        '-a'
    ], { stdio: 'inherit' });

    console.log('\n✅ Setup complete! To start developing:');
    console.log(`cd ${projectName}`);
    console.log('npm run dev');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();