import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/sgen.min.js -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run sgen commands', () => {
        let output = execSync('npm run build').toString();
        output = execSync('sgen -g `pwd`/dist/sgen.min.js -d src/test/fixture/design.json -o testoutput').toString();
        expect(output).toMatchSnapshot();
        output = execSync('npm install', { cwd: 'testoutput' }).toString();
        output = execSync('npm run lint', { cwd: 'testoutput' }).toString();
        output = execSync('npm run build', { cwd: 'testoutput' }).toString();
    });
});
