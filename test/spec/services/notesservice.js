'use strict';

describe('Service: NotesService', function () {
    beforeEach(module('notesApp'));

    var NotesService; 
    beforeEach(inject(function (_NotesService_) {
        NotesService = _NotesService_;
        NotesService.reset();
    }));

    describe('createNote', function() {
        it('creates new note object with id set.', function() {
            var newNote = NotesService.createNote();

            expect(newNote).toBeDefined();
            expect(newNote.id).toBeDefined();
        });

        it('guaranttes that note ids are unique.', function() {
            var newNote1 = NotesService.createNote();
            var newNote2 = NotesService.createNote();

            expect(newNote1.id).not.toEqual(newNote2.id);
        });

        it('adds newly created note to list of tracked notes.', function() {
            var newNote = NotesService.createNote();
            var allNotes = NotesService.getAllNotes();

            expect(allNotes.length).toBe(1);
            expect(allNotes[0]).toBe(newNote);
        });

        it('brings newly create note to front.', function() {
            var note1 = NotesService.createNote();
            var note2 = NotesService.createNote();

            expect(note2.zIndex).toBeGreaterThan(note1.zIndex);
        });
    });
 
    describe('deleteNote', function() {
        var note1, note2;

        beforeEach(function() {
            note1 = NotesService.createNote();
            note2 = NotesService.createNote();
        });

        it('removes note from list of tracked notes.', function() {
            var allNotes = NotesService.getAllNotes();
            expect(allNotes.length).toBe(2);

            NotesService.deleteNote(note1);

            allNotes = NotesService.getAllNotes();
            expect(allNotes.length).toBe(1);
            expect(allNotes[0]).toBe(note2);
        });
    });

    describe('getAllNotes', function() {
        it('returns list of all tracked notes.', function() {
            var allNotes = NotesService.getAllNotes();
            expect(allNotes).toEqual([]);

            var newNote = NotesService.createNote();
            
            allNotes = NotesService.getAllNotes();
            expect(allNotes).toEqual([newNote]);
        });
    });

    describe('bringNoteToFront', function() {
        var note1, note2;

        beforeEach(function() {
            note1 = NotesService.createNote();
            note2 = NotesService.createNote();

            note1.setZIndex(1);
            note2.setZIndex(2);
        });

        it('sets note zIndex to value higher than zIndex of any other note.', function() {
            NotesService.bringNoteToFront(note1);

            expect(note1.zIndex).toBeGreaterThan(note2.zIndex);
        });
    });
});
