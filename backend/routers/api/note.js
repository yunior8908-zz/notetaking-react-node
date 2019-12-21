const router = require('express').Router();
const mongoose = require('mongoose');

const NoteModel = mongoose.model('NoteModel');

router.param('id', (req, res, next, id) => {
    NoteModel.findById(id)
        .then(n => {
            req.Note = n;
            next();
        })
        .catch(next)
});

router.get('/notes', (req, res, next) => {
    const {page = 0, limit = 5, ...rest} = req.query;
    const skip = page * limit;

    let searchComplex = {};

    const searchSimple = Object.keys(rest).map(r => {
        let result = {};
        const splited = r.split("_");
        if(splited.length === 1){
            result[r] = rest[r];
        }else if(splited.length > 1) {
            const en0 = splited[0];
            const en1 = splited[1];
            const prev = searchComplex[en0];
            if(en1 === 'value'){
                searchComplex[en0] = {...prev, '$regex': rest[r]};
            }
            else if(en1 === 'operator' && rest[r] === 'contain'){
                searchComplex[en0] = {...prev, '$options': 'i'};
            }

        }
        return result;
    }).reduce((previousValue, currentValue) => {
        return {...previousValue, ...currentValue}
    },{});

    const search = {...searchSimple, ...searchComplex};

    return NoteModel.find(search).skip(Number(skip)).limit(Number(limit))
        .sort({createAt: 'descending'})
        .then(notes => {
            NoteModel.find(search).count().then(total => {
                return res.status(200).json({
                    notes: notes.map(note => {
                        return note;
                    }),
                    total: total
                })
            }).catch(next);
        })
        .catch(next);
});

router.get('/notes/:id', (req, res, next) => {
    const note = req.Note;
    if (note) {
        res.status(200).json({
            note: note
        })
    } else {
        next(new Error("Note not found"));
    }
});

router.post('/notes', (req, res, next) => {
    const note = new NoteModel(req.body);
    note.save().then(n => {
        res.status(200).json({
            note: n
        });
    }).catch(next);
});

router.put('/notes/:id', (req, res, next) => {
    const note = req.Note;
    const datos = req.body;
    if (note) {
        note.update({...datos})
            .then(nt => {
                res.status(200).json({
                    note: nt
                });
            }).catch(next)

    }
});

router.delete('/notes/:id', (req, res, next) => {
    const note = req.Note;
    note.delete()
        .then((err, nt) => {
            res.status(200).json({
                note: nt
            });
        })
        .catch(next)
});

module.exports = router;