const fs = require('fs')
const archiver = require('archiver')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

function alpha(n) {
  const output = fs.createWriteStream(__dirname + '/dd/ex.zip')
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    )
  })

  output.on('end', function () {
    console.log('Data has been drained')
  })

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
    } else {
      throw err
    }
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)

  const f = __dirname + '/dd/'
  let count = n
  for (let i = 0; i <= count; i++) {
    const file = __dirname + `/dd/${i}.in`
    archive.append(fs.createReadStream(file), { name: `file${i}.in` })
    const file2 = __dirname + `/dd/${i}.out`
    archive.append(fs.createReadStream(file2), { name: `file${i}.out` })
  }

  archive.directory('subdir/', 'new-subdir')

  archive.directory('subdir/', false)

  archive.glob('file*.txt', { cwd: __dirname })

  archive.finalize()
  console.log(count)
}

const ans = (arr) => {
  // let A = arr.trim().split('\n')
  // let FS = +A[0]
  // let m = A[1].trim().split('')
  // let a = '',
  //   b = '',
  //   c = ''
  // for (let i = 0; i < m.length; i++) {
  //   if (i < m.length / 3) {
  //     a += m[i]
  //   } else if (i >= m.length / 3 && i < (m.length * 2) / 3) {
  //     b += m[i]
  //   } else {
  //     c += m[i]
  //   }
  // }
  // let d = a + '\n' + b + '\n' + c
  return arr
}

const makerandoomarray = (size) => {
  if (size == -1) {
    size = Math.floor(Math.random() * 20) * 3
  }

  let an = ''
  an += size + '\n'
  let a = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < size; i++) {
    let r = Math.floor(Math.random() * 25)
    an += a[r]
  }

  return an
}
function main(testcases, size) {
  for (let i = 0; i <= testcases; i++) {
    fs.writeFile(`dd/${i}.in`, `${makerandoomarray(size)}`, (err) => {
      if (err) console.log(err)
      const outputs = ans(fs.readFileSync(`dd/${i}.in`, 'utf8'))
      fs.writeFile(`dd/${i}.out`, outputs.toString(), (err) => {
        if (err) console.log(err)
        console.log('sucess!')
      })
    })
  }
}

//archiver

readline.question('How many test case you want? \n', (testCase) => {
  readline.question('Length of array of integers? \n', (length) => {
    main(+testCase, +length)

    setTimeout(function () {
      alpha(+testCase)
    }, 2000) //wait 2 seconds

    readline.close()
  })
})
